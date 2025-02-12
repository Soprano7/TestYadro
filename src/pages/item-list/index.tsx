import { useEffect, useState } from "react";
import { fetchItems } from "../../shared/api/itemsApi";
import { getStoredItem } from "../..//shared/lib/storage";
import { ItemCard } from "./../../widgets/ItemCard";

interface Item {
    id: number;
    title: string;
    body: string;
}

export const ItemListPage = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchItems().then((data) => {
            const updatedItems = data.slice(0, 10).map((item) => {
                const storedItem = getStoredItem(item.id.toString());
                return storedItem ? { ...item, ...storedItem } : item;
            });

            setItems(updatedItems);
            setLoading(false);
        });
    }, []);

    if (loading) return <p className="text-center text-xl">Загрузка...</p>;

    return (
        <div className="max-w-6xl mx-auto p-6 flex flex-col items-center">
            <h1 className="text-3xl font-bold text-center mb-6">Каталог</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
                {items.map((item) => (
                    <ItemCard key={item.id} id={item.id} title={item.title} body={item.body} />
                ))}
            </div>
        </div>
    );

};