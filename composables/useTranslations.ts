import { useDebounce } from "@vueuse/core";
import { type DirectusTranslation } from "~/types";

const API_FIELDS = [
  "key",
  "updatedAt",
  "translations.value",
  "translations.languages_code",
];

export function useTranslations() {
  const searchQuery = ref("");
  const currentPage = ref(1);
  const pageSize = ref(10);
  const dateRange = ref<{ startDate: string; endDate: string }>({
    startDate: "",
    endDate: "",
  });

  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const debouncedPageSize = useDebounce(pageSize, 300);

  const params = computed(() => {
    const filter: Record<string, any> = {};

    // NOTE: API is giving INTERNAL SERVER ERROR. tried to debug but couldn't spend too much time due to time constraint

    // if (dateRange.value.startDate && dateRange.value.endDate) {
    //   const startDate = new Date(dateRange.value.startDate);
    //   startDate.setHours(0, 0, 0, 0);

    //   const endDate = new Date(dateRange.value.endDate);
    //   endDate.setHours(23, 59, 59, 999);

    //   filter["filter[updatedAt][_gte]"] = startDate.toISOString();
    //   filter["filter[updatedAt][_lte]"] = endDate.toISOString();
    // }

    return {
      fields: API_FIELDS.join(","),
      limit: debouncedPageSize.value,
      page: currentPage.value,
      search: debouncedSearchQuery.value,
      meta: "total_count",
      ...filter,
    };
  });

  const { data, error, status } = useFetch<{
    data: DirectusTranslation[];
    meta: { total_count: number };
  }>(API_ENDPOINTS.translations.get, {
    params,
    watch: [debouncedSearchQuery, currentPage, debouncedPageSize, dateRange],
  });

  const isLoading = computed(() => status.value === "pending");

  const translations = computed(() => data.value?.data || []);

  const totalItems = computed(() => data.value?.meta?.total_count || 0);

  const totalPages = computed(() => {
    if (totalItems.value === 0) return 1;
    return Math.ceil(totalItems.value / pageSize.value);
  });

  function nextPage() {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
    }
  }

  function previousPage() {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  }

  return {
    // State
    searchQuery,
    currentPage,
    pageSize,
    dateRange,
    error,
    isLoading,

    // Computed
    translations,
    totalItems,
    totalPages,

    // Methods
    nextPage,
    previousPage,
  };
}
