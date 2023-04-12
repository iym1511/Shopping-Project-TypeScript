import '../css/Loading.css'
import { motion } from 'framer-motion';

const Loading = () => {
    return (  
        <motion.div initial={{opacity: 0 }}
        animate={{opacity: 1}}
        exit={{opacity: 0}} >
            <div class="loading">
            <div class="container">
                <span></span>
            </div>
                <div class="loading-text">
                    <span class="loading-text-words">L</span>
                    <span class="loading-text-words">O</span>
                    <span class="loading-text-words">A</span>
                    <span class="loading-text-words">D</span>
                    <span class="loading-text-words">I</span>
                    <span class="loading-text-words">N</span>
                    <span class="loading-text-words">G</span>
                </div>
            <div class="container2">
                <span></span>
            </div>
            </div>
        </motion.div>
    );
}

export default Loading;