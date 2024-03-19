import React from "react";


const Card = ({ label, children }: { label: string, children: React.ReactNode }) => {
    return (
        <div className="bg-gray-200 rounded-xl border-b-4 text-sm px-4 py-6 font-bold">
            <h5 className="font-bold">{label}</h5>
            <div className="mt-6">{children}</div>
        </div>
    )
}

export default Card;
