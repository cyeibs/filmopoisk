import { TicketCard } from "@/entities/TicketCard";
import { FunctionComponent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { Icon } from "@/shared/ui/Icon";
import { useSearchMoviesQuery } from "@/app/RTK/services/moviesApi";
import { useFilters } from "@/features/main/filterBy/useFilters";
import { EmptyWarn } from "@/shared/ui/EmptyPage";
import { Loading } from "@/shared/ui/Loading";

export const MovieList: FunctionComponent = () => {
  const [page, setPage] = useState(1);
  const { filters } = useFilters();
  const { data, error, isLoading } = useSearchMoviesQuery({
    page: page,
    filters,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  if (isLoading) return <Loading />;
  if (error) return <EmptyWarn />;

  return (
    <div className={styles.container}>
      {data &&
        data.search_result.map((movie) => (
          <Link
            to={`movie/${movie.id}`}
            key={movie.id}
            className={styles.customLink}
          >
            <TicketCard
              id={movie.id}
              title={movie.title}
              description={movie.description}
              rating={movie.rating}
              poster={movie.poster}
              genre={movie.genre}
              release_year={movie.release_year}
              director={movie.director}
            />
          </Link>
        ))}

      {data && data.search_result.length === 0 && <EmptyWarn />}

      {data && data.total_pages > 1 && (
        <div className={styles.containerButtons}>
          <Icon
            onClick={() => page > 1 && setPage(page - 1)}
            type="arrowLeft"
            className={["arrowSmall", page === 1 && "disabled"]}
          />
          <span className={styles.pageNumber}>{page}</span>
          <Icon
            onClick={() => page < data.total_pages && setPage(page + 1)}
            type="arrowRight"
            className={["arrowSmall", page === data.total_pages && "disabled"]}
          />
        </div>
      )}
    </div>
  );
};
