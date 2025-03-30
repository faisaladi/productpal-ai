
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ComparisonTableProps {
  data: {
    products: string[];
    specs: {
      name: string;
      values: string[];
    }[];
  };
}

const ComparisonTable = ({ data }: ComparisonTableProps) => {
  const [selectedSpec, setSelectedSpec] = useState<{
    name: string;
    values: string[];
    index: number;
  } | null>(null);

  const handleCellClick = (spec: typeof data.specs[0], index: number) => {
    setSelectedSpec({
      name: spec.name,
      values: spec.values,
      index,
    });
  };

  return (
    <>
      <div className="rounded-lg border overflow-hidden">
        <Table className="comparison-table">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Specification</TableHead>
              {data.products.map((product, index) => (
                <TableHead key={index}>{product}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.specs.map((spec, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell className="font-medium">{spec.name}</TableCell>
                {spec.values.map((value, colIndex) => (
                  <TableCell 
                    key={colIndex}
                    className="interactive-cell"
                    onClick={() => handleCellClick(spec, colIndex)}
                  >
                    {value}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Detailed view dialog */}
      <Dialog open={!!selectedSpec} onOpenChange={() => setSelectedSpec(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedSpec?.name}</DialogTitle>
            <DialogDescription>
              {selectedSpec && data.products[selectedSpec.index]}
            </DialogDescription>
          </DialogHeader>
          
          {selectedSpec && (
            <div className="mt-4">
              <p className="text-sm">
                <span className="font-semibold">Value:</span> {selectedSpec.values[selectedSpec.index]}
              </p>
              
              <div className="mt-4 p-4 bg-secondary rounded-lg">
                <h4 className="font-semibold text-sm mb-2">Why it matters</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedSpec.name === "Display" && 
                    "The display affects visual quality, battery life, and overall experience. Higher resolution and refresh rates generally provide better visuals but may consume more power."}
                  {selectedSpec.name === "Processor" && 
                    "The processor determines overall performance, app launching speed, and multitasking capabilities. Newer generations generally offer better performance and power efficiency."}
                  {selectedSpec.name === "RAM" && 
                    "RAM affects multitasking performance. More RAM allows for more apps to run simultaneously without slowdowns."}
                  {selectedSpec.name === "Storage" && 
                    "Storage capacity determines how many apps, photos, videos, and files you can keep on your device."}
                  {selectedSpec.name === "Main Camera" && 
                    "Camera specifications affect photo and video quality. Higher megapixels offer more detail, but sensor size and software processing are equally important."}
                  {selectedSpec.name === "Battery" && 
                    "Battery capacity affects how long your device lasts between charges. However, actual battery life depends on many factors including processor efficiency and display technology."}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ComparisonTable;
