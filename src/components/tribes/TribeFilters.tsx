import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useDiscovery } from '@/contexts/DiscoveryContext';

export default function TribeFilters() {
  const { state, dispatch } = useDiscovery();
  const { filters } = state;

  const handleMemberRangeChange = (values: number[]) => {
    dispatch({
      type: 'UPDATE_FILTERS',
      filters: {
        minMembers: values[0],
        maxMembers: values[1],
      },
    });
  };

  const handleVerifiedChange = (checked: boolean) => {
    dispatch({
      type: 'UPDATE_FILTERS',
      filters: {
        isVerified: checked,
      },
    });
  };

  const handleSortChange = (value: string) => {
    dispatch({
      type: 'UPDATE_FILTERS',
      filters: {
        sortBy: value as 'popular' | 'newest' | 'active',
      },
    });
  };

  return (
    <Card className="p-4 space-y-6">
      <div>
        <h3 className="font-semibold mb-4">Filters</h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Member Range</Label>
            <div className="pt-2">
              <Slider
                defaultValue={[filters.minMembers, filters.maxMembers]}
                max={10000}
                min={0}
                step={100}
                onValueChange={handleMemberRangeChange}
              />
              <div className="flex justify-between mt-1 text-sm text-muted-foreground">
                <span>{filters.minMembers.toLocaleString()} members</span>
                <span>{filters.maxMembers.toLocaleString()} members</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="verified"
              checked={filters.isVerified}
              onCheckedChange={handleVerifiedChange}
            />
            <Label htmlFor="verified">Verified Tribes Only</Label>
          </div>

          <div className="space-y-2">
            <Label>Sort By</Label>
            <Select
              value={filters.sortBy}
              onValueChange={handleSortChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select sort order" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="active">Most Active</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </Card>
  );
}
