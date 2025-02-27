"use client"; 
import { Button } from "@mantine/core";

export function AboutUs() {
    return (
      <div className="bg-gray-100 p-8 rounded-xl">
        <h1 className="text-center text-3xl font-bold mb-6">About Us</h1>
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between">
          
          <div className="lg:w-1/2 mb-8 lg:mb-0 text-center lg:text-left">
            <h2 className="text-2xl font-bold text-gray-800 mb-5">
              Perago Employee Hierarchy Management System
            </h2>
            <p className="text-lg text-gray-700 mb-7">
              Streamline your organization with clear role definitions and workflows.
              From CEO to operational staff, everyone knows their responsibilities and reporting lines.
              This fosters accountability, improves communication, and enhances productivity.
              Employees can view the structure, ensuring better collaboration and decision-making.
            </p>
           
          </div>
  
          <div className="lg:w-1/2 lg:pl-8"> 
            <img
              src="1p.jpg" 
              alt="Employee Hierarchy"
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    );
}
