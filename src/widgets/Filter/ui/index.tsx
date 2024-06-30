import { FunctionComponent } from "react";
import styles from "./styles.module.css";
import { SelectFilter } from "@/features/main/filterBy/SelectFilter";
import { useFilters } from "@/features/main/filterBy/useFilters";
import { GENRES, YEARS } from "../constants/constants";

export const Filter: FunctionComponent = () => {
  const { filters } = useFilters();

  return (
    <div className={styles.lableParent}>
      <div className={styles.lable}>Фильтр</div>
      <div className={styles.selectParent}>
        <SelectFilter
          data={GENRES}
          label="Жанр"
          filterKey="genre"
          placeholder="Выберите жанр"
          initialValue={filters.genre}
        />
        <SelectFilter
          data={YEARS}
          label="Год выпуска"
          filterKey="release_year"
          placeholder="Выберите год"
          initialValue={filters.release_year}
        />
      </div>
    </div>
  );
};
