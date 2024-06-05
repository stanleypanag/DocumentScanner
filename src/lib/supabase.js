import { AppState } from 'react-native'; // Import Platform to check React Native environment
import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'


const supabaseUrl = "https://pvsvuomsqglnxntatwfm.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2c3Z1b21zcWdsbnhudGF0d2ZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc1OTE2MzMsImV4cCI6MjAzMzE2NzYzM30.zrHzWS_R5bJ824Ao3U_nVvW7AAJD3QP7m9BruUPH4Oc";


export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
})

// Listen for AppState changes
AppState.addEventListener('change', (state) => {
    if (state === 'active') {
        supabase.auth.startAutoRefresh();
    } else {
        supabase.auth.stopAutoRefresh();
    }
});
