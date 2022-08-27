import { Status, useJobsQuery } from "../../generated/graphql";
import { Card } from "./Card";
import { Column } from "./Column";

import styles from "./styles.module.css";

const statusList = [Status.ToDo, Status.InProgress, Status.Done];

export function Index() {
  const { data, loading } = useJobsQuery({ pollInterval: 1000 });

  if (!data && loading) {
    return <div>…</div>;
  }

  if (!data) {
    return <div>Something went wrong :(</div>;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        {statusList.map((status: Status) => (
          <h2 key={`Header-${status}`} className={styles.title}>
            {status.replace("_", " ")}
          </h2>
        ))}
      </header>
      <main className={styles.main}>
        {statusList.map((status: Status) => (
          <Column key={status}>
            {data.jobs
              .filter((it) => it.status === status)
              .map((it) => (
                <Card {...it} key={it.id} />
              ))}
          </Column>
        ))}
      </main>
    </div>
  );
}
