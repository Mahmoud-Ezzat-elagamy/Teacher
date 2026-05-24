import { createContext, useContext } from "react";

const tableContext = createContext();

function Table({ layout, children }) {
  const value = { layout };
  return (
    <tableContext.Provider value={value}>
      <div className="flex h-[74vh] w-full flex-col overflow-hidden rounded-xl border border-gray-300 p-4">
        {children}
      </div>
    </tableContext.Provider>
  );
}

function TableHeader({ children }) {
  const { layout } = useContext(tableContext);
  const className = `grid gap-4 border-b-2 border-gray-300 pb-2 mb-4`;
  return (
    <div className={className} style={{ gridTemplateColumns: layout }}>
      {children}
    </div>
  );
}

function TableRow({ children }) {
  const { layout } = useContext(tableContext);
  const className = `grid gap-4 border-b border-gray-200 py-2`;
  return (
    <div className={className} style={{ gridTemplateColumns: layout }}>
      {children}
    </div>
  );
}

function TableBody({ children }) {
  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden pr-2">
      {children}
    </div>
  );
}

function TableCell({ children, className }) {
  className = `py-2 px-4 ${className}`;
  return <div className={className}>{children}</div>;
}

function tableFooter({ children }) {
  return <div className="mt-4 shrink-0">{children}</div>;
}

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Cell = TableCell;
Table.Footer = tableFooter;

function useTable() {
  const context = useContext(tableContext);
  if (!context) {
    throw new Error("useTable must be used within a Table component");
  }
  return context;
}

export { useTable };
export default Table;
