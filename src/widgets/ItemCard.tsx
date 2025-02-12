import { Link } from "react-router-dom";

interface ItemCardProps {
    id: number;
    title: string;
    body: string;
}

const getImageUrl = (id: number) => `https://picsum.photos/seed/${id}/300/200`;

export const ItemCard = ({ id, title, body }: ItemCardProps) => {
    return (
        <div className="relative bg-white shadow-lg rounded-xl overflow-hidden transform hover:scale-105 transition p-4">
            <Link to={`/item/${id}`} className="absolute inset-0 z-0"></Link>

            <div className="relative z-10">
                <img src={getImageUrl(id)} alt={title} className="w-full h-40 object-cover rounded-lg" />
                <h3 className="text-lg font-bold mt-3">{title}</h3>
                <p className="text-sm text-gray-600">{body.slice(0, 80)}...</p>

                <div className="mt-4 flex justify-between  gap-4">
                    <Link to={`/item/${id}`} className="text-blue-500 hover:underline relative z-20 flex ">
                        Подробнее
                    </Link>
                    <Link
                        to={`/edit/${id}`}
                        className="text-yellow-500 hover:underline relative z-20 flex "
                        onClick={(e) => e.stopPropagation()}
                    >
                        ✏️ <span className="ml-1">Редактировать</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};
