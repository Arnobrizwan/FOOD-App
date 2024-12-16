import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { useState } from "react";

// Define filter options
export type FilterOptionsState = {
  id: string;
  label: string;
};

const filterOptions: FilterOptionsState[] = [
  { id: "burger", label: "Burger" },
  { id: "thali", label: "Thali" },
  { id: "biryani", label: "Biryani" },
  { id: "momos", label: "Momos" },
];

const FilterPage = ({ onFilterChange }: { onFilterChange: (filters: string[]) => void }) => {
  const [appliedFilter, setAppliedFilter] = useState<string[]>([]);

  // Handle checkbox selection
  const appliedFilterHandler = (value: string) => {
    setAppliedFilter((prev) => {
      const newFilters = prev.includes(value)
        ? prev.filter((filter) => filter !== value) // Remove filter
        : [...prev, value]; // Add filter

      onFilterChange(newFilters); // Pass updated filters to parent component
      return newFilters;
    });
  };

  // Reset filters
  const resetAppliedFilter = () => {
    setAppliedFilter([]); // Clear local state
    onFilterChange([]); // Inform parent about reset
  };

  return (
    <div className="md:w-72">
      <div className="flex items-center justify-between">
        <h1 className="font-medium text-lg">Filter by cuisines</h1>
        <Button variant={"link"} onClick={resetAppliedFilter}>
          Reset
        </Button>
      </div>
      {filterOptions.map((option) => (
        <div key={option.id} className="flex items-center space-x-2 my-5">
          <Checkbox
            id={option.id}
            checked={appliedFilter.includes(option.label)}
            onClick={() => appliedFilterHandler(option.label)}
          />
          <Label
            htmlFor={option.id}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {option.label}
          </Label>
        </div>
      ))}
    </div>
  );
};

export default FilterPage;
