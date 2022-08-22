import React, { useCallback, useState, useRef, useEffect, useMemo } from 'react';

export function useCollectedCats(query: any, page: any) {
  const [loading, setLoading] = useState(true);

  return { loading, query, page };
}
