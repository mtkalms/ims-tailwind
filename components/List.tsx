import clsx from "clsx";
import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  LiHTMLAttributes,
  useContext,
} from "react";

type SharedListProps = {
  striped?: boolean;
};
type ListProps = DetailedHTMLProps<
  HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
> &
  SharedListProps;
type ListItemProps = DetailedHTMLProps<
  LiHTMLAttributes<HTMLLIElement>,
  HTMLLIElement
>;

const ListContext = React.createContext<SharedListProps>({});

function List({ className, striped, ...props }: ListProps) {
  return (
    <ListContext.Provider value={{ striped }}>
      <ul
        className={clsx(
          "rounded-lg border-1 border-(--border-default)",
          "overflow-x-auto text-sm",
          className,
        )}
        {...props}
      />
    </ListContext.Provider>
  );
}

function ListItem({ className, ...props }: ListItemProps) {
  const { striped } = useContext(ListContext);
  return (
    <li
      className={clsx(
        striped && "even:bg-slate-500/5",
        "hover:bg-slate-500/10",
        "border-(--border-default) [&:not(:last-child)]:border-b-1",
        "px-3 py-2",
        className,
      )}
      {...props}
    />
  );
}

List.Item = ListItem;

export default List;
export { ListItem, ListContext };
