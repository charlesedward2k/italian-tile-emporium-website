
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import * as XLSX from 'xlsx';
import { Product, ProductImage } from '@/types/product';
import { useIsMobile } from '@/hooks/use-mobile';

interface ExcelProductImporterProps {
  onProductsImported: (products: Partial<Product>[]) => void;
}

const ExcelProductImporter = ({ onProductsImported }: ExcelProductImporterProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useIsMobile();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        const products = jsonData.map((row: any) => {
          // Parse the Excel row into a product object
          // This mapping needs to match your Excel columns
          const images: ProductImage[] = [];
          
          // Handle image URLs (assuming comma-separated URLs in the Excel)
          if (row.imageUrls) {
            const urls = row.imageUrls.split(',').map((url: string) => url.trim());
            urls.forEach((url: string, index: number) => {
              images.push({
                id: `img-${row.id || Math.random().toString(36).substr(2, 9)}-${index}`,
                url: url,
                alt: `${row.name || 'Product'} image ${index + 1}`,
                main: index === 0
              });
            });
          }
          
          return {
            id: row.id || Math.random().toString(36).substr(2, 9),
            name: row.name || 'Unnamed Product',
            slug: row.slug || row.name?.toLowerCase().replace(/\s+/g, '-') || 'unnamed-product',
            description: row.description || '',
            shortDescription: row.shortDescription || '',
            price: parseFloat(row.price) || 0,
            compareAtPrice: row.compareAtPrice ? parseFloat(row.compareAtPrice) : undefined,
            category: row.category || 'Uncategorized',
            tags: row.tags ? row.tags.split(',').map((tag: string) => tag.trim()) : [],
            colors: row.colors ? row.colors.split(',').map((color: string) => color.trim()) : [],
            style: row.style || '',
            material: row.material || '',
            dimensions: row.dimensions || '',
            coverage: row.coverage || '',
            images: images,
            variants: [],
            featured: row.featured === 'true' || row.featured === true,
            bestseller: row.bestseller === 'true' || row.bestseller === true,
            ratings: parseFloat(row.ratings) || 0,
            reviews: [],
            createdAt: row.createdAt || new Date().toISOString(),
            updatedAt: row.updatedAt || new Date().toISOString(),
          };
        });
        
        onProductsImported(products);
        toast.success(`Successfully imported ${products.length} products`);
      } catch (error) {
        console.error('Error parsing Excel file:', error);
        toast.error('Failed to parse Excel file. Please check the format.');
      } finally {
        setIsLoading(false);
        // Reset the file input
        if (event.target) event.target.value = '';
      }
    };
    
    reader.onerror = () => {
      toast.error('Error reading the file');
      setIsLoading(false);
      if (event.target) event.target.value = '';
    };
    
    reader.readAsBinaryString(file);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h2 className="text-xl font-serif mb-4">Import Products from Excel</h2>
      
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="excel-file" className="text-sm font-medium mb-2">
            Select Excel File
          </label>
          <input
            type="file"
            id="excel-file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            className={`file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 
                        file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground
                        hover:file:bg-primary/90 cursor-pointer w-full
                        ${isMobile ? 'text-sm' : ''}`}
            disabled={isLoading}
          />
          <p className="text-xs text-muted-foreground mt-2">
            File must be .xlsx or .xls format with product data
          </p>
        </div>
        
        <div className="mt-4">
          <Button 
            type="button" 
            disabled={true} 
            variant="outline" 
            className="w-full"
            onClick={() => {
              // Template download logic would go here
              toast.info('Excel template download feature coming soon');
            }}
          >
            Download Template (Coming Soon)
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExcelProductImporter;
