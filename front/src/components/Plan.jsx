import React from "react";
import { Link } from "react-router-dom";

const Plan = () => {
  return (
    <div className="w-full h-fit flex flex-col items-center text-light min-h-[80vh] justify-center relative bg-background">
      <h1 className="w-full text-4xl font-bold p-5"> مخطط الموقع</h1>
      <div className="w-full  flex items-start p-5">
        <ul style={{ listStyle: "circle" }} className="pl-10">
          <li>
            <Link to={'/'}>الصفحة الرئيسية</Link>
          </li>
          <li>
            <Link to={'/rent'}>الكراء</Link>
          </li>
          <ul style={{ listStyle: "square" }} className="pl-10">
            <li>
              <Link>نتائج الكراء</Link>
            </li>
          </ul>
          <li>
            <Link to={'/booking'}>التوصيل</Link>
          </li>
          <ul style={{ listStyle: "square" }} className="pl-10">
            <li>
              <Link>نتائج التوصيل</Link>
            </li>
          </ul>
          <li>
            <Link to={'/dashboard'}>لوحة التحكم</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Plan;
