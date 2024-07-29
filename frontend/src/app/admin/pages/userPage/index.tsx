import { useContext, useEffect, useState } from "react";
import styles from "./index.module.css";
import LoadingComponent from "../../../../shared/components/Loading";
import { UserContext } from "../../context/userContext";
import BaseLayout from "../../../../shared/components/BaseLayout";
import { listItemAdmin } from "../../../../shared/types/base-layout";
import ListItem from "../../components/listItem";

const UserPage = () => {
  const {service, state} = useContext(UserContext);
  const [showLoading, setShowLoading] = useState(false);

  const deleteUser = (id: string) => () => {
    service.deleteUser(id);
  };

 useEffect(() => {
    service.getUsers()

    state.deleteUserRequestStatus.maybeMap({
      loading: () => {
        setShowLoading(true)
        setTimeout(() => {
          setShowLoading(false) 
        }, 1000);
      }
    })
  }, 
  [service,state.deleteUserRequestStatus]);

  return (
    <BaseLayout titlePage="Usuários" listItem={listItemAdmin}>
      <div className={styles.listContainer}>
        {state.getUsersRequestStatus.maybeMap({
          loading: () => <LoadingComponent></LoadingComponent>,
          failed: () => <span>Erro ao carregar usuários!</span>,
          succeeded: (users) => (
            <>
              {users.map((user) => {
                return (
                  <>
                    <ListItem
                      key={user.id}
                      name={user.name}
                      deleteBtnCallback={deleteUser(user.id)}
                    ></ListItem>
                  </>
                );
              })}
            </>
          ),
        })}
      </div>
      {showLoading && <LoadingComponent></LoadingComponent>}
    </BaseLayout>
  );
};

export default UserPage;