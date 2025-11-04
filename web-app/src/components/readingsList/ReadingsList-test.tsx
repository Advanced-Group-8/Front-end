import { useSelector } from "react-redux";
import ReadingItem from "./ReadingItem";
import type { PackageTracking } from "../../types/types";
import type { RootState } from "../../store/store";
import { useState } from "react";
import IconButton from "../buttons/IconButton";

type ReadingsListProps = {
  pkgReadings: PackageTracking[];
};

const PAGE_SIZE = 5;

const ReadingsList = ({ pkgReadings }: ReadingsListProps) => {
  const userRole = useSelector((state: RootState) => state.auth.profile?.role);
  const readingsArray = Array.isArray(pkgReadings) ? pkgReadings : [];

  const [page, setPage] = useState(0);

  const sortedReadings = [...readingsArray].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // Om receiver: visa bara senaste avläsningen
  if (userRole === "receiver") {
    const latest = sortedReadings[0];
    return (
      <div className="flex flex-col bg-neutral-light-1 pt-4 gap-1 rounded-xl max-w-xl w-full">
        <h3 className="text-center text-xl pb-2">Status Log</h3>
        {latest ? (
          <ReadingItem key={latest.id} reading={latest} />
        ) : (
          <p className="text-center text-gray-500 pb-2">
            No readings available
          </p>
        )}
      </div>
    );
  }

  // För övriga roller: visa paginering
  const totalPages = Math.ceil(sortedReadings.length / PAGE_SIZE);

  const pagedReadings = sortedReadings.slice(
    page * PAGE_SIZE,
    page * PAGE_SIZE + PAGE_SIZE
  );

  return (
    <div className="flex flex-col bg-neutral-light-1 pt-4 gap-1 rounded-xl max-w-xl w-full">
      <h3 className="text-center text-xl pb-2">Status Log</h3>
      {pagedReadings.length > 0 ? (
        pagedReadings.map((reading) => (
          <ReadingItem key={reading.id} reading={reading} />
        ))
      ) : (
        <p className="text-center text-gray-500 pb-2">No readings available</p>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-2">
          <IconButton
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 0}
            size="small"
            variant="primary"
            iconVariant="arrow-left"
          />
          <span>
            Sida {page + 1} av {totalPages}
          </span>
          <IconButton
            onClick={() => setPage((p) => p + 1)}
            disabled={page >= totalPages - 1}
            size="small"
            variant="primary"
            iconVariant="arrow-right"
          />
        </div>
      )}
    </div>
  );
};

export default ReadingsList;
