import Table from "@material-ui/core/Table";
import Toolbar from "@material-ui/core/Toolbar";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { useLocale } from "contexts/LocaleContext";
import { localeMap } from "providers/LocaleProvider";
import styled from "@emotion/styled";

const StyledPaper = styled(Paper)`
  overflow: hidden;
`;

const LocaleDebug = () => {
  const { locale, t } = useLocale();
  const map = localeMap[locale];

  return (
    <StyledPaper>
      <Toolbar>
        <Typography>{t("locale_data")}</Typography>
      </Toolbar>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t("key")}</TableCell>
              <TableCell>{t("value")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(map).map((key) => (
              <TableRow key={key}>
                <TableCell>{key}</TableCell>
                <TableCell>{map[key]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledPaper>
  );
};

export default LocaleDebug;
