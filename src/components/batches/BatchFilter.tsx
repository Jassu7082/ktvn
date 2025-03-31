
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./select";

interface BatchFilterProps {
  batchYears: string[];
  selectedBatch: string;
  setSelectedBatch: (batch: string) => void;
}

const BatchFilter = ({ batchYears, selectedBatch, setSelectedBatch }: BatchFilterProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <h2 className="text-lg font-medium text-slate-700">Filter Results by Batch Year</h2>
      <Select value={selectedBatch} onValueChange={setSelectedBatch}>
        <SelectTrigger className="w-[180px] text-white">
          <SelectValue placeholder="Select batch" />
        </SelectTrigger>
        <SelectContent className="text-white">
          <SelectGroup>
            {batchYears.map((year) => (
              <SelectItem key={year} value={year}>
                {year === "all" ? "All Batches" : `Batch ${year}`}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default BatchFilter;
