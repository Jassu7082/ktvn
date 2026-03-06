
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./select";

interface BatchFilterProps {
  batchYears: string[];
  selectedBatch: string;
  setSelectedBatch: (batch: string) => void;
}

const BatchFilter = ({ batchYears, selectedBatch, setSelectedBatch }: BatchFilterProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <Select value={selectedBatch} onValueChange={setSelectedBatch}>
        <SelectTrigger className="w-full sm:w-[240px]">
          <SelectValue placeholder="Select Batch Year" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {batchYears.map((year) => (
              <SelectItem key={year} value={year}>
                {year === "all" ? "All Collections" : `Batch ${year}`}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default BatchFilter;
