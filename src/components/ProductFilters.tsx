
import { useState } from "react";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { ProductFilters } from "@/types/product";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProductFiltersProps {
  categories: string[];
  materials: string[];
  styles: string[];
  colors: string[];
  currentFilters: ProductFilters;
  onFilterChange: (filters: ProductFilters) => void;
}

const ProductFilters = ({
  categories,
  materials,
  styles,
  colors,
  currentFilters,
  onFilterChange,
}: ProductFiltersProps) => {
  const isMobile = useIsMobile();
  const [price, setPrice] = useState<[number, number]>([
    currentFilters.minPrice || 0,
    currentFilters.maxPrice || 100,
  ]);
  const [localFilters, setLocalFilters] = useState<ProductFilters>({
    ...currentFilters,
  });

  const handleFilterChange = (newFilters: Partial<ProductFilters>) => {
    setLocalFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handlePriceChange = (values: number[]) => {
    setPrice([values[0], values[1]]);
    handleFilterChange({ minPrice: values[0], maxPrice: values[1] });
  };

  const applyFilters = () => {
    onFilterChange(localFilters);
  };

  const resetFilters = () => {
    const emptyFilters: ProductFilters = {};
    setLocalFilters(emptyFilters);
    onFilterChange(emptyFilters);
    setPrice([0, 100]);
  };

  const toggleArrayFilter = (
    filterName: keyof ProductFilters,
    value: string
  ) => {
    const currentValues = localFilters[filterName] as string[] || [];
    const exists = currentValues.includes(value);
    
    let newValues;
    if (exists) {
      newValues = currentValues.filter((v) => v !== value);
    } else {
      newValues = [...currentValues, value];
    }
    
    if (newValues.length === 0) {
      // If array is empty, remove the property entirely
      const { [filterName]: _, ...rest } = localFilters;
      setLocalFilters(rest);
    } else {
      handleFilterChange({ [filterName]: newValues });
    }
  };

  const FilterSections = () => (
    <>
      <Accordion type="single" collapsible defaultValue="category" className="w-full">
        <AccordionItem value="category">
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={localFilters.category === category}
                    onCheckedChange={() =>
                      handleFilterChange({
                        category: localFilters.category === category ? undefined : category,
                      })
                    }
                  />
                  <label
                    htmlFor={`category-${category}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="px-2">
              <Slider
                defaultValue={[price[0], price[1]]}
                value={[price[0], price[1]]}
                max={100}
                step={1}
                onValueChange={handlePriceChange}
                className="py-4"
              />
              <div className="flex items-center justify-between">
                <span className="text-sm">${price[0].toFixed(2)}</span>
                <span className="text-sm">${price[1].toFixed(2)}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="material">
          <AccordionTrigger>Materials</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {materials.map((material) => (
                <div key={material} className="flex items-center space-x-2">
                  <Checkbox
                    id={`material-${material}`}
                    checked={(localFilters.materials || []).includes(material)}
                    onCheckedChange={() => toggleArrayFilter("materials", material)}
                  />
                  <label
                    htmlFor={`material-${material}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {material}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="style">
          <AccordionTrigger>Styles</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {styles.map((style) => (
                <div key={style} className="flex items-center space-x-2">
                  <Checkbox
                    id={`style-${style}`}
                    checked={(localFilters.styles || []).includes(style)}
                    onCheckedChange={() => toggleArrayFilter("styles", style)}
                  />
                  <label
                    htmlFor={`style-${style}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {style}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="color">
          <AccordionTrigger>Colors</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {colors.map((color) => (
                <div key={color} className="flex items-center space-x-2">
                  <Checkbox
                    id={`color-${color}`}
                    checked={(localFilters.colors || []).includes(color)}
                    onCheckedChange={() => toggleArrayFilter("colors", color)}
                  />
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-4 h-4 rounded-full border"
                      style={{ backgroundColor: color }}
                    ></div>
                    <label
                      htmlFor={`color-${color}`}
                      className="text-sm font-medium leading-none capitalize peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {color}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex gap-2 mt-4">
        <Button variant="outline" onClick={resetFilters} className="flex-1">
          Reset
        </Button>
        <Button onClick={applyFilters} className="flex-1">
          Apply Filters
        </Button>
      </div>
    </>
  );

  return (
    <>
      {isMobile ? (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="mb-4 w-full">
              <Filter className="mr-2 h-4 w-4" />
              Filter Products
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-3/4">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-4 pb-16">
              <FilterSections />
            </div>
            <SheetFooter className="absolute bottom-0 left-0 right-0 p-4 bg-background border-t">
              <SheetClose asChild>
                <Button onClick={applyFilters} className="w-full">
                  Apply Filters
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ) : (
        <div className="sticky top-24 w-full max-w-[250px] h-fit p-4 border rounded-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Filters</h3>
            <Button variant="ghost" size="sm" onClick={resetFilters} className="h-8 px-2">
              <X className="h-4 w-4 mr-1" /> Clear
            </Button>
          </div>
          <FilterSections />
        </div>
      )}
    </>
  );
};

export default ProductFilters;
