
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image, X, Plus, Upload } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const productSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  category: z.string().min(1, { message: "Category is required" }),
  price: z.coerce.number().positive({ message: "Price must be positive" }),
  compareAtPrice: z.coerce.number().positive().optional(),
  shortDescription: z.string().min(10, { message: "Short description must be at least 10 characters" }),
  description: z.string().min(30, { message: "Description must be at least 30 characters" }),
  material: z.string().min(1, { message: "Material is required" }),
  style: z.string().min(1, { message: "Style is required" }),
  color: z.string().min(1, { message: "Color is required" }),
  size: z.string().min(1, { message: "Size is required" }),
  stock: z.coerce.number().int().nonnegative({ message: "Stock must be a non-negative integer" }),
  sku: z.string().min(1, { message: "SKU is required" }),
});

type ProductFormData = z.infer<typeof productSchema>;

const AddProductForm = () => {
  const [images, setImages] = useState<string[]>([]);
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      category: "",
      price: 0,
      compareAtPrice: undefined,
      shortDescription: "",
      description: "",
      material: "",
      style: "",
      color: "",
      size: "",
      stock: 0,
      sku: "",
    },
  });
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages]);
    }
  };
  
  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };
  
  const onSubmit = (data: ProductFormData) => {
    // In a real implementation, this would send data to the backend
    console.log("Product data:", { ...data, images });
    
    toast({
      title: "Product created",
      description: `${data.name} has been added to the catalog.`,
    });
    
    // Reset form
    reset();
    setImages([]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Basic Info */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input id="name" {...register("name")} />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input id="price" type="number" step="0.01" {...register("price")} />
              {errors.price && (
                <p className="text-sm text-destructive">{errors.price.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="compareAtPrice">Compare at Price ($)</Label>
              <Input
                id="compareAtPrice"
                type="number"
                step="0.01"
                {...register("compareAtPrice")}
              />
              {errors.compareAtPrice && (
                <p className="text-sm text-destructive">{errors.compareAtPrice.message}</p>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select onValueChange={(value) => setValue("category", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="floor-tiles">Floor Tiles</SelectItem>
                <SelectItem value="wall-tiles">Wall Tiles</SelectItem>
                <SelectItem value="kitchen-tiles">Kitchen Tiles</SelectItem>
                <SelectItem value="bathroom-tiles">Bathroom Tiles</SelectItem>
                <SelectItem value="outdoor-tiles">Outdoor Tiles</SelectItem>
                <SelectItem value="decorative">Decorative Tiles</SelectItem>
                <SelectItem value="mosaic">Mosaic Tiles</SelectItem>
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-sm text-destructive">{errors.category.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="shortDescription">Short Description</Label>
            <Textarea id="shortDescription" {...register("shortDescription")} />
            {errors.shortDescription && (
              <p className="text-sm text-destructive">{errors.shortDescription.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Full Description</Label>
            <Textarea id="description" className="min-h-[150px]" {...register("description")} />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description.message}</p>
            )}
          </div>
        </div>
        
        {/* Product Details & Images */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="material">Material</Label>
              <Select onValueChange={(value) => setValue("material", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select material" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ceramic">Ceramic</SelectItem>
                  <SelectItem value="porcelain">Porcelain</SelectItem>
                  <SelectItem value="marble">Marble</SelectItem>
                  <SelectItem value="granite">Granite</SelectItem>
                  <SelectItem value="travertine">Travertine</SelectItem>
                  <SelectItem value="limestone">Limestone</SelectItem>
                  <SelectItem value="terracotta">Terracotta</SelectItem>
                </SelectContent>
              </Select>
              {errors.material && (
                <p className="text-sm text-destructive">{errors.material.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="style">Style</Label>
              <Select onValueChange={(value) => setValue("style", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="traditional">Traditional</SelectItem>
                  <SelectItem value="rustic">Rustic</SelectItem>
                  <SelectItem value="vintage">Vintage</SelectItem>
                  <SelectItem value="minimalist">Minimalist</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                  <SelectItem value="artisan">Artisan</SelectItem>
                </SelectContent>
              </Select>
              {errors.style && (
                <p className="text-sm text-destructive">{errors.style.message}</p>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <Select onValueChange={(value) => setValue("color", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="white">White</SelectItem>
                  <SelectItem value="beige">Beige</SelectItem>
                  <SelectItem value="gray">Gray</SelectItem>
                  <SelectItem value="black">Black</SelectItem>
                  <SelectItem value="blue">Blue</SelectItem>
                  <SelectItem value="green">Green</SelectItem>
                  <SelectItem value="terracotta">Terracotta</SelectItem>
                  <SelectItem value="multi">Multi-colored</SelectItem>
                </SelectContent>
              </Select>
              {errors.color && (
                <p className="text-sm text-destructive">{errors.color.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="size">Size</Label>
              <Select onValueChange={(value) => setValue("size", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10x10">10x10 cm</SelectItem>
                  <SelectItem value="15x15">15x15 cm</SelectItem>
                  <SelectItem value="20x20">20x20 cm</SelectItem>
                  <SelectItem value="30x30">30x30 cm</SelectItem>
                  <SelectItem value="30x60">30x60 cm</SelectItem>
                  <SelectItem value="60x60">60x60 cm</SelectItem>
                  <SelectItem value="60x120">60x120 cm</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
              {errors.size && (
                <p className="text-sm text-destructive">{errors.size.message}</p>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="stock">Stock Quantity</Label>
              <Input id="stock" type="number" {...register("stock")} />
              {errors.stock && (
                <p className="text-sm text-destructive">{errors.stock.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sku">SKU</Label>
              <Input id="sku" {...register("sku")} />
              {errors.sku && (
                <p className="text-sm text-destructive">{errors.sku.message}</p>
              )}
            </div>
          </div>
          
          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Product Images</Label>
            <div className="grid grid-cols-3 gap-2">
              {images.map((src, index) => (
                <div key={index} className="relative aspect-square rounded-md overflow-hidden border">
                  <img 
                    src={src} 
                    alt={`Product ${index + 1}`} 
                    className="w-full h-full object-cover" 
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-1 right-1 h-6 w-6"
                    onClick={() => removeImage(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              
              {images.length < 6 && (
                <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-md border border-dashed bg-muted/25 hover:bg-muted/50">
                  <div className="flex flex-col items-center justify-center text-sm">
                    <Upload className="mb-1 h-4 w-4" />
                    <span>Upload</span>
                  </div>
                  <Input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>
            <p className="text-xs text-muted-foreground">Upload up to 6 product images. First image will be the main display image.</p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button type="submit" size="lg">
          Create Product
        </Button>
      </div>
    </form>
  );
};

export default AddProductForm;
