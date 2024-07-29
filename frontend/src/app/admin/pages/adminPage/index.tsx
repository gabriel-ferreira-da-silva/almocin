import BaseLayout from "../../../../shared/components/BaseLayout";
import { listItemAdmin } from "../../../../shared/types/base-layout";

const AdminPage = () => {
  return (
    <BaseLayout titlePage="Administração do Almocin" listItem={listItemAdmin}>
      <h3>Seja bem-vindo ao painel de administração do Almocin!</h3>
      <br />
      <p>
        Aqui você pode gerenciar os usuários, categorias e o cardápio do restaurante.
      </p>
      Clique no Menu no canto superior esquerdo para navegar entre as opções.
    </BaseLayout>
  );
}

export default AdminPage;