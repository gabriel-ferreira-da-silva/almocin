import { useCallback, useContext, useEffect, useState } from "react";
import LoadingComponent from "../../../../shared/components/Loading";
import BaseLayout from "../../../../shared/components/BaseLayout";
import { StatsContext } from "../../context/statsContext/index";
import {
  Table,
  Select,
  TableRow,
  MenuItem,
  TableHead,
  TableCell,
  TableBody,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import { listItemAdmin } from "../../../../shared/types/base-layout";
import { StatsStateType } from "../../context/statsContext/types";
import { StatsModel } from "../../models/StatsModel";
import { AppError } from "../../../../shared/errors/app-error";

const StatsPage = () => {
  const { state, service } = useContext(StatsContext);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<StatsModel>({} as StatsModel);
  const [filter, setFilter] = useState<StatsStateType>(StatsStateType.GET_STATS);
  const [errorHandler, setErrorHandler] = useState<string | null>(null);

  useEffect(() => {
    service.getStats()
  }, [service]);

  useEffect(() => {
    function runLoading() {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }

    function runErrorHandler(error: AppError) {
      console.error(error.message)
      setErrorHandler('Erro ao carregar estatísticas!');
    }

    function getData(statsData: StatsModel | Partial<StatsModel>) {
      setStats(statsData as StatsModel);
      setErrorHandler(null);
    }

    state.getStatsRequestStatus.maybeMap({
      succeeded: (statsData) => getData(statsData),
      failed: (e) => runErrorHandler(e),
      loading: () => runLoading(),
    });
  }, [state.getStatsRequestStatus]);

  const handleFilterChange = useCallback((
    event: SelectChangeEvent<StatsStateType>
  ) => {
    const type = event.target.value as StatsStateType;
    service.getStats(type);
    setFilter(type)
  }, [service]);

  return (
    <BaseLayout titlePage="Estatísticas" listItem={listItemAdmin}>
      <div>
        <FormControl variant="outlined">
          <InputLabel id="filter-label">Filtro</InputLabel>
          <Select
            labelId="filter-label"
            id="filter-select"
            value={filter}
            onChange={handleFilterChange}
            label="Filtro"
          >
            <MenuItem value={StatsStateType.GET_STATS}>Todos</MenuItem>
            <MenuItem value={StatsStateType.GET_MONTH}>Mês Atual</MenuItem>
            <MenuItem value={StatsStateType.GET_MONEY}>Receita</MenuItem>
          </Select>
        </FormControl>

        {loading && <LoadingComponent></LoadingComponent>}

        {errorHandler ? (
          <span>Erro ao carregar estatísticas!</span>
        ) : (
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Total de Usuários</TableCell>
                <TableCell>Total de Itens</TableCell>
                <TableCell>Receita Total</TableCell>
                <TableCell>Receita do Mês Atual</TableCell>
                <TableCell>Total de Pedidos</TableCell>
                <TableCell>Pedidos do Mês Atual</TableCell>
                <TableCell>Ticket Médio</TableCell>
                <TableCell>Ticket Médio do Mês Atual</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{stats.totalUsers}</TableCell>
                <TableCell>{stats.totalItems}</TableCell>
                <TableCell>{stats.totalRevenue}</TableCell>
                <TableCell>{stats.currentMonthRevenue}</TableCell>
                <TableCell>{stats.totalOrders}</TableCell>
                <TableCell>{stats.monthOrders}</TableCell>
                <TableCell>{stats.averageTicket}</TableCell>
                <TableCell>{stats.currentMonthAverageTicket}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
      </div>
    </BaseLayout>
  );
};

export default StatsPage;
