import { MouseEvent, useState, FC } from "react";
import styled from "@emotion/styled";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import TranslateIcon from "@material-ui/icons/Translate";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Locale, useLocale } from "../../contexts/LocaleContext";

const ALL_LOCALES = [Locale.enUS, Locale.zhCN, Locale.zhTW];

const StyledTranslateIcon = styled(TranslateIcon)`
  margin-right: 5px;
`;

const StyledButton = styled(Button)`
  color: inherit;
`;

const SelectLocale: FC = () => {
  const { locale, setLocale, t } = useLocale();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickItem = (locale: Locale) => {
    setLocale(locale);
    handleClose();
  };

  return (
    <div>
      <StyledButton aria-haspopup={true} onClick={handleClick}>
        <StyledTranslateIcon /> {t(locale)} <ExpandMoreIcon />
      </StyledButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {ALL_LOCALES.filter((x) => x !== locale).map((locale) => (
          <MenuItem key={locale} onClick={() => handleClickItem(locale)}>
            {t(locale)}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default SelectLocale;
