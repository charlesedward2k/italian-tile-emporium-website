
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { useAuth } from "@/contexts/AuthContext";
import { Product } from "@/types/product";
import { products } from "@/data/products";
import AddProductForm from "@/components/AddProductForm";

const AdminPanel = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  
  // Mock order data
  const orders = [
    { id: "ORD-1234", customer: "John Doe", date: "2024-05-10", total: 785.50, status: "Delivered" },
    { id: "ORD-1235", customer: "Sarah Smith", date: "2024-05-12", total: 420.75, status: "Processing" },
    { id: "ORD-1236", customer: "Michael Brown", date: "2024-05-13", total: 1250.00, status: "Shipped" },
    { id: "ORD-1237", customer: "Laura Wilson", date: "2024-05-14", total: 340.25, status: "Pending" },
    { id: "ORD-1238", customer: "Robert Taylor", date: "2024-05-15", total: 890.00, status: "Delivered" },
  ];
  
  // Mock customer data
  const customers = [
    { id: "CUST-001", name: "John Doe", email: "john.doe@example.com", orders: 3, totalSpent: 1205.75, joined: "2024-03-15" },
    { id: "CUST-002", name: "Sarah Smith", email: "sarah.smith@example.com", orders: 2, totalSpent: 420.75, joined: "2024-03-25" },
    { id: "CUST-003", name: "Michael Brown", email: "michael.brown@example.com", orders: 5, totalSpent: 2850.00, joined: "2024-01-10" },
    { id: "CUST-004", name: "Laura Wilson", email: "laura.wilson@example.com", orders: 1, totalSpent: 340.25, joined: "2024-04-20" },
    { id: "CUST-005", name: "Robert Taylor", email: "robert.taylor@example.com", orders: 4, totalSpent: 1590.00, joined: "2023-12-05" },
  ];

  useEffect(() => {
    // Redirect if not admin
    if (!isAdmin) {
      navigate("/");
      toast({
        title: "Access denied",
        description: "You need admin permissions to view this page.",
        variant: "destructive",
      });
    }
    
    // In a real app, this would fetch from an API
    setProductList(products);
    setFilteredProducts(products);
  }, [isAdmin, navigate, toast]);

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
            <TabsTrigger value="add-product">Add Product</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-serif">Product Management</h2>
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

          <TabsContent value="add-product">
            <div className="space-y-6">
              <h2 className="text-2xl font-serif">Add New Product</h2>
              <AddProductForm />
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-serif">Order Management</h2>
            </div>

            {/* Orders Table */}
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <span 
                          className={
                            order.status === "Delivered" ? "text-green-600" : 
                            order.status === "Processing" ? "text-blue-600" :
                            order.status === "Shipped" ? "text-purple-600" : 
                            "text-yellow-600"
                          }
                        >
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="customers" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-serif">Customer Management</h2>
            </div>

            {/* Customers Table */}
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-center">Orders</TableHead>
                    <TableHead className="text-right">Total Spent</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">{customer.id}</TableCell>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell className="text-center">{customer.orders}</TableCell>
                      <TableCell className="text-right">${customer.totalSpent.toFixed(2)}</TableCell>
                      <TableCell>{customer.joined}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
