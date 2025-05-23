
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ExcelProductImporter from '@/components/ExcelProductImporter';
import { Product } from '@/types/product';
import { toast } from "sonner";

const ProductManagementPage = () => {
  const [products, setProducts] = useState<Partial<Product>[]>([]);
  const [activeTab, setActiveTab] = useState<string>('import');

  const handleProductsImported = (importedProducts: Partial<Product>[]) => {
    setProducts(importedProducts);
    // In a real application, you would save these to your database
    console.log('Products imported:', importedProducts);
  };

  const handleSaveProducts = () => {
    // In a real application, this would save the products to your backend
    toast.success(`${products.length} products saved successfully`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-serif mb-6">Product Management</h1>

      <Card>
        <CardHeader>
          <CardTitle>Manage Products</CardTitle>
          <CardDescription>
            Import products from Excel or manage your existing product catalog
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="import">Import Products</TabsTrigger>
              <TabsTrigger value="preview">Preview Data</TabsTrigger>
            </TabsList>
            
            <TabsContent value="import" className="mt-0">
              <ExcelProductImporter onProductsImported={handleProductsImported} />
              
              {products.length > 0 && (
                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    {products.length} products imported. Review them in the Preview tab.
                  </p>
                  <Button onClick={() => setActiveTab('preview')}>
                    Review Imported Products
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="preview">
              {products.length > 0 ? (
                <div className="mt-4">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs uppercase bg-muted">
                        <tr>
                          <th className="px-4 py-2">Name</th>
                          <th className="px-4 py-2">Price</th>
                          <th className="px-4 py-2">Category</th>
                          <th className="px-4 py-2">Images</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product, index) => (
                          <tr key={index} className="border-b">
                            <td className="px-4 py-2">{product.name}</td>
                            <td className="px-4 py-2">${product.price?.toFixed(2)}</td>
                            <td className="px-4 py-2">{product.category}</td>
                            <td className="px-4 py-2">{product.images?.length || 0} images</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <Button onClick={handleSaveProducts}>
                      Save All Products
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No products imported yet</p>
                  <Button variant="outline" className="mt-4" onClick={() => setActiveTab('import')}>
                    Go to Import
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="mt-8 bg-muted p-6 rounded-lg">
        <h3 className="font-serif text-xl mb-4">Excel Import Instructions</h3>
        <p className="mb-3">
          To import products using Excel, your file should have the following columns:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>name - Product name (required)</li>
          <li>price - Product price (required)</li>
          <li>description - Full product description</li>
          <li>shortDescription - Brief product description</li>
          <li>category - Product category</li>
          <li>tags - Comma-separated list of tags</li>
          <li>colors - Comma-separated list of colors</li>
          <li>imageUrls - Comma-separated list of image URLs</li>
        </ul>
        <p className="text-sm text-muted-foreground">
          For a complete template with all supported fields, use the "Download Template" button.
        </p>
      </div>
    </div>
  );
};

export default ProductManagementPage;
