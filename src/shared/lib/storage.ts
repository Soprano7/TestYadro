const STORAGE_KEY = "itemsData";

// Получаем данные из LocalStorage
export const getStoredItem = (id: string) => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;
    const items = JSON.parse(data);
    return items[id] || null;
};

// Сохраняем изменения
export const saveItem = (id: string, updatedData: { title: string; body: string }) => {
    const data = localStorage.getItem(STORAGE_KEY);
    const items = data ? JSON.parse(data) : {};
    items[id] = updatedData;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};