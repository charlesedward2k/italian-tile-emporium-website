
import React, { useState, useEffect } from "react";
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Product } from "@/types/product";
import { products } from "@/data/products";

const AdminPanel = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    // In a real app, this would fetch from an API
    setProductList(products);
    setFilteredProducts(products);
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase();
      const filtered = productList.filter(product => 
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.id.includes(lowercaseQuery) ||
        product.category.toLowerCase().includes(lowercaseQuery)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(productList);
    }
  }, [searchQuery, productList]);

  const handleEditProduct = (product: Product) => {
    setSelectedProduct({...product});
    setIsEditDialogOpen(true);
  };

  const handleSaveProduct = () => {
    if (!selectedProduct) return;
    
    // In a real app, this would call an API to update the product
    const updatedProducts = productList.map(product => 
      product.id === selectedProduct.id ? selectedProduct : product
    );
    
    setProductList(updatedProducts);
    setIsEditDialogOpen(false);
    
    toast({
      title: "Product Updated",
      description: `${selectedProduct.name} has been successfully updated.`,
    });
  };

  const handleDeleteProduct = (productId: string) => {
    // In a real app, this would call an API to delete the product
    const updatedProducts = productList.filter(product => product.id !== productId);
    setProductList(updatedProducts);
    
    toast({
      title: "Product Deleted",
      description: "The product has been successfully deleted.",
      variant: "destructive",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    if (!selectedProduct) return;
    
    setSelectedProduct({
      ...selectedProduct,
      [field]: e.target.value,
    });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    if (!selectedProduct) return;
    
    const value = e.target.value === "" ? "" : parseFloat(e.target.value);
    
    setSelectedProduct({
      ...selectedProduct,
      [field]: value,
    });
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-serif mb-2">Admin Panel</h1>
          <p className="text-muted-foreground">
            Manage your Italian tile product inventory and customer information.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="products">
          <TabsList className="mb-8">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-serif">Product Management</h2>
              <Button>Add New Product</Button>
            </div>

            {/* Search and Filter */}
            <div className="flex items-center gap-4">
              <Input
                placeholder="Search products..."
                className="max-w-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Products Table */}
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <img
                          src={product.images[0].url}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                      <TableCell>
                        {product.variants.some(v => v.inStock) ? (
                          <span className="text-green-600">In Stock</span>
                        ) : (
                          <span className="text-red-500">Out of Stock</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditProduct(product)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  {filteredProducts.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                        No products found. Try adjusting your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="orders">
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2">Orders Management</h3>
                <p className="text-muted-foreground">
                  This feature is coming soon in the next update.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="customers">
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2">Customer Management</h3>
                <p className="text-muted-foreground">
                  This feature is coming soon in the next update.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Make changes to the product information below.
            </DialogDescription>
          </DialogHeader>

          {selectedProduct && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={selectedProduct.name}
                    onChange={(e) => handleInputChange(e, "name")}
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={selectedProduct.category}
                    onChange={(e) => handleInputChange(e, "category")}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={selectedProduct.price}
                    onChange={(e) => handlePriceChange(e, "price")}
                  />
                </div>
                <div>
                  <Label htmlFor="compareAtPrice">Compare at Price ($)</Label>
                  <Input
                    id="compareAtPrice"
                    type="number"
                    value={selectedProduct.compareAtPrice || ""}
                    onChange={(e) => handlePriceChange(e, "compareAtPrice")}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="shortDescription">Short Description</Label>
                <Textarea
                  id="shortDescription"
                  value={selectedProduct.shortDescription}
                  onChange={(e) => handleInputChange(e, "shortDescription")}
                  className="resize-none"
                />
              </div>

              <div>
                <Label htmlFor="description">Full Description</Label>
                <Textarea
                  id="description"
                  value={selectedProduct.description}
                  onChange={(e) => handleInputChange(e, "description")}
                  className="resize-none min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="material">Material</Label>
                  <Input
                    id="material"
                    value={selectedProduct.material}
                    onChange={(e) => handleInputChange(e, "material")}
                  />
                </div>
                <div>
                  <Label htmlFor="style">Style</Label>
                  <Input
                    id="style"
                    value={selectedProduct.style}
                    onChange={(e) => handleInputChange(e, "style")}
                  />
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveProduct}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPanel;
