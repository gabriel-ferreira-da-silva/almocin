import { useCallback, useContext, useEffect } from "react";
import styles from "./index.module.css";
import LoadingComponent from "../../../../shared/components/Loading";
import BaseLayout from "../../../../shared/components/BaseLayout";
import { listItemAdmin } from "../../../../shared/types/base-layout";
import { MenuContext } from "../../../../shared/context/menuContext";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

const MenuPage = () => {
  const {service, state} = useContext(MenuContext);

  const handleDeleteItem = useCallback((id: string) => () => {
    service.deleteItem(id);
  }, [service]);

  useEffect(() => {
    service.getItems()
  }, [service, state.deleteItemRequestStatus]);

  return (
    <BaseLayout titlePage="Cardápio" listItem={listItemAdmin}>
      <div className={styles.listContainer}>
        <h2>Itens no cardápio</h2>
        {state.getItemsRequestStatus.maybeMap({
          loading: () => <LoadingComponent></LoadingComponent>,
          failed: () => <span>Erro ao carregar itens!</span>,
          succeeded: (items) => (
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Preço</TableCell>
                  <TableCell>Categoria</TableCell>
                  <TableCell>Promoção</TableCell>
                  <TableCell>Descrição</TableCell>
                  <TableCell>Tempo de preparo</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>{row.price}</TableCell>
                    <TableCell>{row.category?.name ?? 'Sem categoria'}</TableCell>
                    <TableCell>{row.price < row.oldPrice ? 'Em promoção' : '-'}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{row.timeToPrepare}</TableCell>
                    <TableCell sx={
                      {display: 'flex', gap: '10px'}
                    }>
                      <a
                        className={styles.editLink}
                        href={`/admin/menu/edit/${row.id}`}
                      >Editar</a>

                      <button
                        type="button"
                        className={styles.deleteItem}
                        onClick={handleDeleteItem(row.id)}
                      >
                        Excluir
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ),
        })}
      </div>
      <a href="/admin/menu/create" className={styles.createItem}>
        Criar item
      </a>
    </BaseLayout>
  );
};

export default MenuPage;