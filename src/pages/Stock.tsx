import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { CreateStock } from "./CreateStock";
import { ManageStock } from "./ManageStock";

function Stock() {
  const [loading, setLoading] = useState(true);
  const [stock, setStock] = useState<any>(null);
  const [products, setProducts] = useState([]);

  async function loadData() {
    try {
      const stockRes = await api.get("/users/stock");
      setStock(stockRes.data);

      const productsRes = await api.get("/users/products");
      setProducts(productsRes.data);
    } catch {
      setStock(null);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateStock(name: string) {
    const res = await api.post("/users/stock", { name });
    setStock(res.data);
  }

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <p>Carregando...</p>;

  if (!stock) {
    return <CreateStock onCreate={handleCreateStock} />;
  }

  return <ManageStock stock={stock} products={products} />;
}

export default Stock;
