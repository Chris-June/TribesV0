import { useEngagement } from '@/contexts/EngagementContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ChartBar, Clock, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';

interface TribePollProps {
  tribeId: string;
}

export default function TribePoll({ tribeId }: TribePollProps) {
  const { state, dispatch } = useEngagement();
  const [isCreating, setIsCreating] = useState(false);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [endDate, setEndDate] = useState('');

  const polls = state.polls[tribeId] || [];

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleRemoveOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleCreatePoll = () => {
    if (!question.trim() || options.some(opt => !opt.trim())) return;

    const poll = {
      id: Date.now().toString(),
      tribeId,
      question,
      options: options.map((text, index) => ({
        id: `option-${index}`,
        text,
        votes: 0,
      })),
      createdBy: 'current-user-id', // Replace with actual user ID
      createdAt: new Date(),
      endsAt: endDate ? new Date(endDate) : undefined,
      isActive: true,
      totalVotes: 0,
    };

    dispatch({
      type: 'ADD_POLL',
      tribeId,
      poll,
    });

    // Reset form
    setIsCreating(false);
    setQuestion('');
    setOptions(['', '']);
    setEndDate('');
  };

  const handleVote = (pollId: string, optionId: string) => {
    dispatch({
      type: 'VOTE_POLL',
      tribeId,
      pollId,
      optionId,
      userId: 'current-user-id', // Replace with actual user ID
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Polls</h2>
        <Button onClick={() => setIsCreating(true)} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Create Poll
        </Button>
      </div>

      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Poll</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Question</label>
              <Input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="What's your question?"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Options</label>
              {options.map((option, index) => (
                <div key={index} className="flex space-x-2">
                  <Input
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                  />
                  {options.length > 2 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveOption(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              {options.length < 6 && (
                <Button variant="outline" onClick={handleAddOption} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Option
                </Button>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">End Date (Optional)</label>
              <Input
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreatePoll}>
                Create Poll
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <AnimatePresence>
          {polls.map((poll) => (
            <motion.div
              key={poll.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant={poll.isActive ? 'default' : 'secondary'}>
                      {poll.isActive ? 'Active' : 'Closed'}
                    </Badge>
                    {poll.endsAt && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>
                          Ends {formatDistanceToNow(new Date(poll.endsAt), { addSuffix: true })}
                        </span>
                      </div>
                    )}
                  </div>
                  <CardTitle className="mt-2">{poll.question}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {poll.options.map((option) => {
                      const percentage = poll.totalVotes > 0
                        ? (option.votes / poll.totalVotes) * 100
                        : 0;

                      return (
                        <div key={option.id} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{option.text}</span>
                            <span className="text-sm text-muted-foreground">
                              {option.votes} votes ({Math.round(percentage)}%)
                            </span>
                          </div>
                          <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              className="absolute inset-y-0 left-0 bg-primary"
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ duration: 0.5 }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {poll.isActive && !poll.userVote && (
                    <div className="flex flex-wrap gap-2">
                      {poll.options.map((option) => (
                        <Button
                          key={option.id}
                          variant="outline"
                          size="sm"
                          onClick={() => handleVote(poll.id, option.id)}
                        >
                          Vote: {option.text}
                        </Button>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <ChartBar className="h-4 w-4 mr-1" />
                      <span>{poll.totalVotes} total votes</span>
                    </div>
                    <span>
                      Created {formatDistanceToNow(new Date(poll.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {polls.length === 0 && !isCreating && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <ChartBar className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium">No polls yet</p>
            <p className="text-sm text-muted-foreground">
              Create a poll to gather opinions from tribe members.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
