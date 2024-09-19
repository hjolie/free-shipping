interface CalculationProps {
    threshold: string;
    calculateTotal: () => number;
    calculateDifference: () => number | string;
}

const CalculationTable: React.FC<CalculationProps> = ({
    threshold,
    calculateTotal,
    calculateDifference,
}) => {
    return (
        <table className="min-w-full bg-gray-800 text-gray-300 mt-5">
            <thead className="border-b border-gray-600">
                <tr className="font-semibold">
                    <th className="py-3 px-4">免運門檻</th>
                    <th className="py-3 px-4">累積金額(含團主份額)</th>
                    <th className="py-3 px-4">免運差額</th>
                </tr>
            </thead>
            <tbody className="bg-gray-700">
                <tr className="border-b border-gray-600">
                    <td className="py-3 px-4">${threshold}</td>
                    <td className="py-3 px-4">${calculateTotal()}</td>
                    <td className="py-3 px-4">{calculateDifference()}</td>
                </tr>
            </tbody>
        </table>
    );
};

export default CalculationTable;
