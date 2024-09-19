import BuyersDataType from "@/types/buyersDataType";

interface BuyersTableProps {
    buyersData: BuyersDataType[];
    calculateSubtotal: (quantity: number) => number;
}

const BuyersTable: React.FC<BuyersTableProps> = ({
    buyersData,
    calculateSubtotal,
}) => {
    return (
        <table className="min-w-full bg-gray-800 text-gray-300 mt-5 mb-10">
            <thead className="border-b border-gray-600">
                <tr className="font-semibold">
                    <th className="py-3 px-4">姓名</th>
                    <th className="py-3 px-4">數量</th>
                    <th className="py-3 px-4">備註</th>
                    <th className="py-3 px-4">小計</th>
                </tr>
            </thead>
            <tbody className="bg-gray-700">
                {buyersData.map((data, index) => (
                    <tr key={index} className="border-b border-gray-600">
                        <td className="py-3 px-4">{data.name}</td>
                        <td className="py-3 px-4">{data.quantity}</td>
                        <td className="py-3 px-4">{data.note}</td>
                        <td className="py-3 px-4">
                            ${calculateSubtotal(data.quantity)}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default BuyersTable;
