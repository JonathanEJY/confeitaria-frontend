import ProductForm from "@/features/products/components/ProductForm";
import ProductTable from "@/features/products/components/ProductTable";
import Header from "@/components/layout/Header";
import { useGetProducts } from "@/features/products/queries";

function Products() {
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

  const { data: products, isLoading } = useGetProducts();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        <Header
          title="Meus Produtos"
          subtitle="Cadastre seus produtos nessa página!"
        />

        <ProductForm />

        {isLoading ? (
          <div className="space-y-2">
            <div className="h-12 bg-gray-200 rounded animate-pulse" />
            <div className="h-12 bg-gray-200 rounded animate-pulse" />
            <div className="h-12 bg-gray-200 rounded animate-pulse" />
          </div>
        ) : (
          <ProductTable products={products || []} />
        )}
      </div>
    </div>
  );
}

export default Products;
