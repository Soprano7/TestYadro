import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ItemListPage } from "../../pages/item-list";
import { ItemDetailPage } from "../../pages/item-detail";
import { ItemEditPage } from "../../pages/item-edit";

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ItemListPage />} />
                <Route path="/item/:id" element={<ItemDetailPage />} />
                <Route path="/edit/:id" element={<ItemEditPage />} />
            </Routes>
        </BrowserRouter>
    );
};
