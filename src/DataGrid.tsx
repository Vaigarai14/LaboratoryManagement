'use client';
import React, { useState } from "react";

import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import KeepMountedModal from "./ModelPage";
import MUiModelPage from "./MUIModelPage";
import { RootState } from "./store";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./store/credSlice";
import { Button } from "@mui/material";


ModuleRegistry.registerModules([AllCommunityModule]);

// Row Data Interface
interface IRow {
  make: string;
  model: string;
  price: number;
  electric: boolean;
}

interface TestMethod {
  method: string;
  parameters: string[];
  sampleType: string;
}

interface schema {
  id: number;
  labName: string;
  location: string;
  contactPerson: string;
  contactNumber: string;
  servicesOffered: string[];
  status: string;
  testMethods: TestMethod[];
}


// Create new GridExample component
export function GridExample() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState<boolean>(false);
  const [editData, setEditData] = React.useState<schema[]>([]);

  const LabList: schema[] = [
    {
      id: 1,
      labName: "Viswa Lab Chennai",
      location: "Chennai",
      contactPerson: "Dr. Ramesh",
      contactNumber: "9876543210",
      servicesOffered: ["Chemical Analysis", "Oil Testing", "Water Quality"],
      status: "Active",
      testMethods: [
        {
          method: "ASTM D445",
          parameters: ["Viscosity", "Temperature"],
          sampleType: "Oil"
        },
        {
          method: "ISO 7027",
          parameters: ["Turbidity"],
          sampleType: "Water"
        }
      ]
    },
    {
      id: 2,
      labName: "Viswa Lab Mumbai",
      location: "Mumbai",
      contactPerson: "Dr. Priya",
      contactNumber: "9123456789",
      servicesOffered: ["Material Testing", "Environmental Testing"],
      status: "Inactive",
      testMethods: [
        {
          method: "ISO 9001",
          parameters: ["Hardness", "Tensile Strength"],
          sampleType: "Metal"
        },
        {

          method: "EPA 8270D",
          parameters: ["Organic Pollutants"],
          sampleType: "Air"
        }
      ]
    }
  ]

  const LabData = useSelector((state: RootState) => state.cred);

  const { Cred } = LabData

  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState<schema[]>(Cred);

  console.log(rowData);

  const handleNavigate = (event: any) => {
    const rowData = event.data;
    console.log(rowData)
    setOpen(true)
    setEditData(rowData)
  }

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState<ColDef<schema>[]>([
    { field: "id", headerName: 'Id', onCellClicked: handleNavigate },
    { field: "labName" },
    { field: "location" },
    { field: "contactNumber" },
    { field: "status" },
    { field: "servicesOffered" },
  ]);

  const defaultColDef: ColDef = {
    flex: 1,
  };

  return (
    <div>
      <div className="my-10 flex justify-between items-center">
        <h1 className="text-3xl">Data Grid</h1>
        <Button variant="contained" color='info' className="mt-6 rounded" onClick={() => { setOpen(true) }} >Create</Button>
      </div>
      <div style={{ width: "100%", height: "200px" }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
        />
        <KeepMountedModal open={open} setOpen={setOpen} editData={editData} setEditData={setEditData} />
      </div>
    </div>

  );
};





