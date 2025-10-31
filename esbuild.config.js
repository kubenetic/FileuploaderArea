import esbuild from 'esbuild';
import {sassPlugin} from 'esbuild-sass-plugin';

const isWatch = process.argv.includes('--watch');

const ctx = await esbuild.context({
    entryPoints: {
        'main': 'src/main.js',
        'styles': 'src/main.scss'
    },
    bundle: true,
    minify: true,
    sourcemap: 'linked',
    outdir: './dist',
    platform: "browser",
    target: "es2020",
    minifyWhitespace: true,
    loader: {
        '.css': 'css'
    },
    plugins: [sassPlugin()],
    define: {
        'process.env.NODE_ENV': '"development"'
    },
});

if (isWatch) {
    await ctx.watch();
} else {
    await ctx.rebuild();
    await ctx.dispose();
}