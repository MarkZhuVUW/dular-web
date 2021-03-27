import { ReactElement, useState } from "react";
import { useLocale } from "contexts/LocaleContext";
import styled from "@emotion/styled";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Container from "@material-ui/core/Container";
import SelectLocale from "components/select/Locale";
import SelectTheme from "components/select/Theme";
import { MenuItemType, DrawerMenu } from "components/common/Menu";

const StyledIconButton = styled(IconButton)`
  color: inherit;
`;

const StyledTypography = styled(Typography)`
  flex: 1;
`;

const StyledContainer = styled(Container)`
  padding-top: 100px;
`;

export const DefaultLayout = ({
  title = "app_name",
  menuItems = [],
  children,
}: {
  title?: string;
  menuItems?: Array<MenuItemType>;
  children: ReactElement;
}) => {
  const { t } = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <AppBar>
        <Toolbar>
          <StyledIconButton onClick={() => setMenuOpen(true)}>
            <MenuIcon />
          </StyledIconButton>
          <StyledTypography>{t(title)}</StyledTypography>
          <SelectLocale />
          <SelectTheme />
        </Toolbar>
      </AppBar>
      <DrawerMenu
        items={menuItems}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
      <StyledContainer>{children}</StyledContainer>
    </>
  );
};
