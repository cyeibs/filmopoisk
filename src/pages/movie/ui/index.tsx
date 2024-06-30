import { TicketCard } from "@/entities/TicketCard";
import { ActorSwiper } from "@/widgets/ActorsSwiper";
import { FunctionComponent } from "react";
import styles from "./styles.module.css";
import { ActorCard } from "@/shared/ui/ActorCard";
import { useGetMovieByIdQuery } from "@/app/RTK/services/moviesApi";
import { useParams } from "react-router-dom";
import { EmptyWarn } from "@/shared/ui/EmptyPage";
import { Loading } from "@/shared/ui/Loading";

export const Movie: FunctionComponent = () => {
  const { movieId } = useParams<{ movieId: string }>();

  const { data: movie, error, isLoading } = useGetMovieByIdQuery(movieId || "");

  if (!movieId) {
    return <EmptyWarn />;
  }

  const items = movie?.actors.map((actor, index) => (
    <ActorCard key={index} name={actor.name} photo={actor.photo} />
  ));

  if (isLoading) return <Loading />;
  if (error) return <EmptyWarn />;

  return (
    <div className={styles.container}>
      {movie && (
        <>
          <TicketCard
            id={movie.id}
            type="full"
            title={movie.title}
            description={movie.description}
            rating={movie.rating}
            poster={movie.poster}
            genre={movie.genre}
            release_year={movie.release_year}
            director={movie.director}
          />
          <ActorSwiper items={items || []} />
        </>
      )}
    </div>
  );
};
