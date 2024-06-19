import { AppState } from 'react-native';
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { REACT_NATIVE_SUPABASE_URL, REACT_NATIVE_SUPABASE_ANON_KEY } from '@env'


const supabaseURL = REACT_NATIVE_SUPABASE_URL;
const supabaseAnonKey = REACT_NATIVE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseURL, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});

// Listen for AppState changes
AppState.addEventListener('change', (state) => {
    if (state === 'active') {
        supabase.auth.startAutoRefresh();
    } else {
        supabase.auth.stopAutoRefresh();
    }
});
