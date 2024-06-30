import { FunctionComponent } from "react";
import styles from "./styles.module.css";
import { Filter } from "@/widgets/Filter";
import { SearchInput } from "@/shared/ui/SearchInput";
import { MovieList } from "@/widgets/MovieList";

export const Main: FunctionComponent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.filterFrame}>
        <Filter />
      </div>
      <div className={styles.main}>
        <SearchInput />
        <MovieList />
      </div>
    </div>
  );
};
