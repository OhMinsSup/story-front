import { useMutation } from 'react-query';

// api
import { api } from '@api/module';

// constants
import { API_ENDPOINTS } from '@constants/constant';

// types
import type {
  DataIdParams,
  StoryApi,
  StoryErrorApi,
} from '@api/schema/story-api';

export function useMutationUnRegister() {
  const fetcherUnRegister = (dataId: DataIdParams) => {
    const id = dataId ?? '';
    return api.put({
      url: API_ENDPOINTS.LOCAL.USER.UNREGIISTER(id),
      body: {},
    });
  };

  const mutation = useMutation<StoryApi, StoryErrorApi, DataIdParams>(
    fetcherUnRegister,
  );

  return mutation;
}
