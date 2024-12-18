import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import { Box, Button, IconButton } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { DeleteForever } from "@mui/icons-material";

interface TestMethod {
    method: string;
    parameters: string;
    sampleType: string;
}

interface EditableGridProps {
    testMethod: TestMethod[];
    onTestMethodChange: (updatedMethods: TestMethod[]) => void;
}

const EditableGrid: React.FC<EditableGridProps> = ({ testMethod, onTestMethodChange }) => {
    const [rowData, setRowData] = useState<TestMethod[]>(testMethod);

    useEffect(() => {
        if (testMethod) {
            setRowData(testMethod);
        }
    }, [testMethod]);

    const handleDelete = (rowIndex: number) => {
        const updatedData = rowData.filter((_, index) => index !== rowIndex);
        setRowData(updatedData);
        // onTestMethodChange(updatedData); // Notify parent
    };

    const columnDefs: ColDef<TestMethod>[] = [
        {
            headerName: "Method",
            field: "method",
            editable: true,
        },
        {
            headerName: "Parameters",
            field: "parameters",
            editable: true,
            cellEditor: "agSelectCellEditor",
            cellEditorParams: {
                values: ["Viscosity", "Temperature", "Turbidity", "Hardness", "Tensile Strength", "Organic Pollutants"],
            },
        },
        {
            headerName: "Sample Type",
            field: "sampleType",
            editable: true,
            cellEditor: "agSelectCellEditor",
            cellEditorParams: {
                values: ["Metal", "Air", "Water", "Oil"],
            },
        },
        {
            headerName: "Actions",
            cellRenderer: (params: any) => (
                <IconButton
                    color="error"
                    onClick={() => handleDelete(params.node.rowIndex)}
                >
                    <DeleteForever />
                </IconButton>
            ),
        },
    ];

    const addRow = () => {
        const newRow = { method: "New Field..", parameters: "Select Option", sampleType: "Select Option" };
        const updatedData = [...rowData, newRow];
        setRowData(updatedData);
        // onTestMethodChange(updatedData);
    };

    return (
        <Box>
            <Button variant="contained" onClick={addRow}>
                Add Row
            </Button>
            <Box className="ag-theme-alpine" style={{ height: 300, width: "100%" }}>
                <AgGridReact<TestMethod>
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={{
                        flex: 1,
                        editable: true,
                        resizable: true,
                    }}
                    onCellValueChanged={(params) => {
                        if (params.rowIndex != null) {
                            const updatedData = rowData?.map((row, index) =>
                                index === params.rowIndex ? { ...params?.data } : row
                            );
                            setRowData(updatedData);
                            onTestMethodChange(updatedData);
                        }
                    }}
                />
            </Box>
        </Box>
    );
};

export default EditableGrid;