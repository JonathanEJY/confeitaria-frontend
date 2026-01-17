import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

import ProductForm from "@/features/products/components/ProductForm";
import ProductTable from "@/features/products/components/ProductTable";
import Header from "@/components/layout/Header";

function Products() {
  const { user } = useAuth();
  // // const [products, setProducts] = useState<Product[]>([]);
  // const [name, setName] = useState("");
  // const [unit, setUnit] = useState("");
  // const [loading, setLoading] = useState(true);

  // async function loadProducts() {
  //   try {
  //     const response = await api.get("/users/products");
  //     setProducts(response.data);
  //   } catch (error) {
  //     alert("Erro ao carregar produtos");
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // async function handleCreateProduct(e: React.FormEvent) {
  //   e.preventDefault();

  //   if (!name) {
  //     alert("Nome é obrigatório");
  //     return;
  //   }

  //   try {
  //     await api.post("/users/product", {
  //       name,
  //       unit,
  //       user,
  //     });

  //     toast.success("Produto adicionado com sucesso!", {
  //       autoClose: 1500,
  //     });
  //     setName("");
  //     setUnit("un");
  //     toast.update;
  //     await loadProducts();
  //   } catch (error) {
  //     alert("Erro ao criar produto");
  //   }
  // }

  // async function handleDeleteProduct(productId: string) {
  //   const confirm = window.confirm("Deseja realmente deletar este produto?");

  //   if (!confirm) return;

  //   try {
  //     await api.delete(`/users/product`, {
  //       data: {
  //         productId,
  //       },
  //     });
  //     toast.success("Produto deletado com sucesso!", {
  //       autoClose: 1500,
  //     });
  //     await loadProducts();
  //   } catch (error) {
  //     toast.error("Erro ao deletar o produto", {
  //       isLoading: false,
  //       autoClose: 1500,
  //     });
  //   }
  // }

  // async function handleUpdateProduct(productId: string) {
  //   try {
  //     const getProductInfo = await api.get("/users/product", {
  //       params: {
  //         productId: productId,
  //       },
  //     });
  //     const product = getProductInfo.data[0];
  //     setProduct(product);

  //     setEditName(product.name);
  //     setEditUnit(product.unit);
  //   } catch (error) {
  //     toast.error("Erro ao buscar informações do produto");
  //     return;
  //   }
  //   setSelectedProductId(productId);
  //   setOpenEditDialog(true);
  // }

  // async function handleSaveEdit(e: React.FormEvent) {
  //   e.preventDefault();

  //   if (!editName) {
  //     toast.error("Nome é obrigatório");
  //     return;
  //   }

  //   try {
  //     await api.patch("/users/product", {
  //       uuid: selectedProductId,
  //       name: editName,
  //       unit: editUnit,
  //     });

  //     toast.success("Produto atualizado com sucesso!", {
  //       autoClose: 1500,
  //     });

  //     setOpenEditDialog(false);
  //     await loadProducts();
  //   } catch (error) {
  //     toast.error("Erro ao atualizar produto");
  //   }
  // }

  // useEffect(() => {
  //   loadProducts();
  // }, []);

  // if (loading) {
  //   return <p>Carregando produtos...</p>;
  // }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        <Header
          title="Meus Produtos"
          subtitle="Cadastre seus produtos nessa página!"
        />

        <ProductForm />

        <ProductTable />
      </div>
    </div>
  );
}

export default Products;

// EXEMPLO:

// import { useProducts } from '@/features/products/api/get-products';
// import { ProductList } from '@/features/products/components/ProductList';

// export function Products() {
//   const { data: products, isLoading, error } = useProducts();

//   if (isLoading) return <div>Carregando...</div>;
//   if (error) return <div>Erro ao carregar produtos</div>;

//   return (
//     <div>
//       <h1>Produtos</h1>
//       <ProductList products={products} />
//     </div>
//   );
// }
