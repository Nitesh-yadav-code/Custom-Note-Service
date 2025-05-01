import {createClient} from '@supabase/supabase-js';

const supabaseUrl = 'https://pthwkwbyyxcazmigxpzv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0aHdrd2J5eXhjYXptaWd4cHp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYwMTUxOTEsImV4cCI6MjA2MTU5MTE5MX0.lm80N0lOUI8DzoT5imzkyum2fxeAVMXwYX-AstukqDA';
const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default supabaseClient