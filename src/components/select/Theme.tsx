import { FC } from "react";
import styled from "@emotion/styled";
import IconButton from "@material-ui/core/IconButton";
import { Theme, useTheme } from "../../contexts/ThemeContext";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import NightsStayIcon from "@material-ui/icons/NightsStay";

const StyledIconButton = styled(IconButton)`
  color: inherit;
`;

const SelectTheme: FC = () => {
  const { theme, setTheme } = useTheme();

  const switchTheme = () => {
    setTheme(theme === Theme.Light ? Theme.Dark : Theme.Light);
  };

  return (
    <StyledIconButton onClick={switchTheme}>
      {theme === Theme.Light ? <WbSunnyIcon /> : <NightsStayIcon />}
    </StyledIconButton>
  );
};

export default SelectTheme;
