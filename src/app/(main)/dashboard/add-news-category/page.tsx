"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const Page = () => {
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!category.trim()) {
      setError('Category name is required');
      return;
    }
    
    // Here you would typically handle the category submission
    console.log('New category submitted:', category);
    // Reset form
    setCategory('');
    setError('');
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Add New Category</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter new category name"
                className={`w-full ${error ? 'border-red-500' : ''}`}
              />
              {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
              )}
            </div>
            <Button 
              type="submit"
              className="w-full"
            >
              Add Category
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;