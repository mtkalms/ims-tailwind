import clsx from "clsx";
import React from "react";
import {
  DetailedHTMLProps,
  HTMLAttributes,
  TableHTMLAttributes,
  useContext,
} from "react";

type SharedTableProps = {
  striped?: boolean;
};
type TableProps = DetailedHTMLProps<
  TableHTMLAttributes<HTMLTableElement>,
  HTMLTableElement
> &
  SharedTableProps;
type TableHeaderProps = DetailedHTMLProps<
  HTMLAttributes<HTMLTableSectionElement>,
  HTMLTableSectionElement
>;
type TableRowProps = DetailedHTMLProps<
  HTMLAttributes<HTMLTableRowElement>,
  HTMLTableRowElement
>;
type TableCellProps = DetailedHTMLProps<
  HTMLAttributes<HTMLTableCellElement>,
  HTMLTableCellElement
>;

const TableContext = React.createContext<SharedTableProps>({});

function Table({ className, ...props }: TableProps) {
  return (
    <TableContext.Provider value={{ striped: props.striped }}>
      <div
        className={clsx(
          "rounded-lg border-1 border-(--border-default)",
          "overflow-x-auto text-sm",
          className,
        )}
      >
        <table className="w-full" {...props} />
      </div>
    </TableContext.Provider>
  );
}

function TableHeader({ className, ...props }: TableHeaderProps) {
  return (
    <thead
      className={clsx(
        "border-b-1 border-(--border-default) bg-slate-500/10",
        className,
      )}
      {...props}
    />
  );
}

function TableHeaderCell({ className, ...props }: TableCellProps) {
  return <th className={clsx("px-3 py-2", className)} {...props} />;
}

function TableRow({ className, ...props }: TableRowProps) {
  const { striped } = useContext(TableContext);
  return (
    <tr
      className={clsx(
        striped && "even:bg-slate-500/5",
        "hover:bg-slate-500/10",
        "border-(--border-default) [&:not(:last-child)]:border-b-1",
        className,
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: TableCellProps) {
  return <td className={clsx("px-3 py-2", className)} {...props} />;
}

Table.Header = TableHeader;
TableHeader.Cell = TableHeaderCell;
Table.Row = TableRow;
Table.Cell = TableCell;

export default Table;
export { TableHeader, TableRow, TableCell, TableHeaderCell, TableContext };
