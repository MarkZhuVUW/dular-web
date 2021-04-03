import { Element, useState } from "react";
import styled from "@emotion/styled";
import { useRoute } from "contexts/RouteContext";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Drawer from "@material-ui/core/Drawer";

export type MenuItemType = {
  path: string;
  icon?: Element;
  title: string;
  onClick?: () => void;
  children?: Array<MenuItemType>;
  defaultOpen?: boolean;
};

const StyledCollapse = styled(Collapse)`
  padding-left: 1rem;
`;

export const MenuItem = ({ item }: { item: MenuItemType }) => {
  const hasChildren = item.children !== undefined && item.children.length > 0;

  const [open, setOpen] = useState(item.defaultOpen === true);
  const { redirect } = useRoute();

  const onClick = () => {
    if (hasChildren) {
      setOpen(!open);
    } else {
      if (item.onClick !== undefined) {
        item.onClick();
      } else {
        redirect(item.path);
      }
    }
  };

  return (
    <>
      <ListItem button onClick={onClick}>
        {item.icon !== undefined && <ListItemIcon>{item.icon}</ListItemIcon>}
        <ListItemText primary={item.title} />
        {hasChildren && (open ? <ExpandLess /> : <ExpandMore />)}
      </ListItem>
      {hasChildren && (
        <StyledCollapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {(item.children || []).map((subItem) => (
              <MenuItem key={subItem.path} item={subItem} />
            ))}
          </List>
        </StyledCollapse>
      )}
    </>
  );
};

export const Menu = ({ items = [] }: { items: Array<MenuItemType> }) => (
  <List>
    {items.map((item) => (
      <MenuItem key={item.path} item={item} />
    ))}
  </List>
);

const StyledDrawer = styled(Drawer)`
  .MuiDrawer-paper {
    min-width: 15rem;
  }
`;

export const DrawerMenu = ({
  anchor = "left",
  open = true,
  items = [],
  onClose = () => null,
}: {
  open?: boolean;
  anchor?: "top" | "left" | "bottom" | "right";
  items: Array<MenuItemType>;
  onClose?: () => void;
}) => (
  <StyledDrawer anchor={anchor} open={open} onClose={onClose}>
    <Menu items={items} />
  </StyledDrawer>
);
