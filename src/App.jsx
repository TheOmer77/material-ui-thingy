import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import CollapsibleAppBar from './components/CollapsibleAppBar';

const useStyles = makeStyles((theme) => ({
  customAppBar: {
    background: theme.palette.background.default,
    color: theme.palette.primary.main,
    boxShadow: 'none',
    '@media (prefers-color-scheme: dark)': {
      color: theme.palette.primary.light,
    },
  },
  card: {
    padding: theme.spacing(2),
    position: 'fixed',
    insetBlockEnd: theme.spacing(1),
    marginInline: theme.spacing(1),
  },
  content: {
    paddingBlockStart: theme.spacing(7),
    [theme.breakpoints.up('sm')]: { paddingBlockStart: theme.spacing(8) },
  },
  contentCollapsing: { paddingBlockStart: 256 },
}));

const App = () => {
  const classes = useStyles();
  const [collapsing, setCollapsing] = useState(false);
  const [hasSubtitle, setHasSubtitle] = useState(false);
  const [customClassname, setCustomClassname] = useState(false);

  return (
    <>
      <CollapsibleAppBar
        collapsing={collapsing}
        title={collapsing ? 'Collapsing app bar!' : 'Just a normal app bar'}
        subtitle={hasSubtitle && 'It can also have a subtitle'}
        className={customClassname ? classes.customAppBar : null}
      />
      <Card className={classes.card} elevation={4}>
        <FormGroup row>
          <FormControlLabel
            control={
              <Switch
                checked={collapsing}
                onChange={(event) => setCollapsing(event.target.checked)}
                name='collapsing'
              />
            }
            label='Collapsing'
          />
          <FormControlLabel
            control={
              <Switch
                checked={hasSubtitle}
                onChange={(event) => setHasSubtitle(event.target.checked)}
                name='hasSubtitle'
              />
            }
            label='Has subtitle'
          />
          <FormControlLabel
            control={
              <Switch
                checked={customClassname}
                onChange={(event) => setCustomClassname(event.target.checked)}
                name='customClassname'
              />
            }
            label='Custom classname'
          />
        </FormGroup>
      </Card>
      <Container
        className={collapsing ? classes.contentCollapsing : classes.content}
      >
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
          labore dolorum non veritatis tempore nesciunt itaque rerum, soluta
          commodi animi? Voluptatibus voluptatum quo voluptates modi eum
          incidunt laborum ipsum, laboriosam repellat, suscipit voluptas
          molestiae ad autem debitis aliquam optio. Repellat beatae soluta aut
          similique maiores blanditiis obcaecati ab accusamus harum! Quas, non
          voluptate dolore accusamus assumenda quod, repudiandae minus nesciunt
          error quo sit dignissimos. Nobis quasi nesciunt, animi, molestiae
          cupiditate ducimus expedita voluptas accusamus quod optio, pariatur
          eligendi eius! Suscipit laborum minima iure impedit enim nam ipsam
          corporis dolores voluptatem? Iure possimus provident asperiores beatae
          eius libero inventore in minima esse quis! Nobis beatae quidem, non
          pariatur minima autem sit natus quaerat temporibus expedita iste
          magnam omnis inventore accusamus nemo soluta id consectetur vitae
          quibusdam quasi cum eum ut iusto. Quisquam ex cum, perferendis omnis,
          quo ea illo consequatur blanditiis aperiam placeat expedita
          necessitatibus possimus maxime? Aperiam perspiciatis natus maiores
          tempora quisquam! Sed neque cum libero earum dignissimos facilis quo
          laborum maiores id omnis sunt reiciendis fuga ratione obcaecati eius,
          dolorum porro autem nobis. Ad doloremque est earum aperiam rerum nam
          inventore, eaque distinctio quasi qui. Debitis fugiat praesentium
          facere. Sed, quidem quibusdam tempora rerum laborum esse voluptatibus
          suscipit est repellat! Sapiente, pariatur molestias adipisci at quos
          ratione consequatur voluptate! Molestiae dolores fuga ab eveniet amet
          illo nemo in aliquam, architecto eum commodi qui sapiente atque
          voluptatibus temporibus unde exercitationem obcaecati? Quasi
          voluptatibus voluptas ipsa quibusdam est alias a minima aliquid.
          Itaque, maiores dolor debitis at accusamus eos modi vel nemo sit minus
          laudantium doloribus voluptatum molestiae cum sapiente rerum dolorem
          officiis quaerat atque ad exercitationem nostrum eius sequi? Dolorem a
          recusandae excepturi expedita dolore eius sunt quod, beatae sequi
          quidem iure repellendus, veniam quis? Dolorum delectus eligendi atque
          perspiciatis, nam dolores ipsum aperiam, facere quibusdam vero nulla
          error nemo magnam aut repudiandae ad eveniet laudantium, cupiditate
          nihil. Architecto, cum unde! Tenetur voluptate repellendus, blanditiis
          quod minima sapiente enim rem ipsam molestias magni, molestiae tempora
          quia maiores deserunt veniam voluptas nemo qui eaque nisi? Nobis
          reprehenderit officiis quis nulla perferendis tempore unde obcaecati
          animi in. Quis, sint neque corporis quaerat enim libero dolorem ipsam
          incidunt aliquid ipsa tenetur iure rerum impedit officiis quam
          doloribus nisi perferendis omnis praesentium cumque earum fugiat
          magni. Consequuntur ullam dolorem ipsam provident voluptatum molestias
          ut suscipit, maxime officia, vero consequatur tempore necessitatibus
          quae, animi veritatis laudantium aliquam cumque sequi? Quasi, ad
          iusto. Nisi aperiam, quaerat quae voluptates pariatur asperiores
          reprehenderit ab id impedit quisquam odit accusantium labore adipisci
          autem nihil? Ipsa, perspiciatis. Omnis distinctio nemo perspiciatis
          iusto aspernatur eos quasi porro totam neque in praesentium incidunt a
          qui, corporis cum vel vero, cumque eius earum voluptas error non quas.
          Consectetur voluptatum explicabo rem incidunt iure porro laboriosam
          veniam, laudantium blanditiis quaerat ullam itaque quos, quisquam ab
          reprehenderit autem beatae vitae quo. Est amet hic aliquam nostrum
          maiores perferendis consequatur beatae perspiciatis ratione, tempore
          itaque impedit adipisci nesciunt minima numquam distinctio dicta
          magnam ab voluptate dolores libero. Quo maxime ullam provident autem
          corporis voluptatem enim, cumque dolorem magni nobis accusamus,
          architecto quaerat! Assumenda, officia, saepe quaerat molestiae natus
          facilis alias iste aperiam temporibus aliquam dolor ipsam totam eos
          delectus odio, aliquid aspernatur aut maxime est. Quaerat sequi ea ad
          adipisci dignissimos eos necessitatibus nulla fuga facilis, libero
          perspiciatis ab repellat aspernatur ratione sit fugit, eligendi
          officiis harum quibusdam id doloribus? Dolorem vitae dolores optio
          expedita officia eligendi repellendus maiores veritatis voluptates
          illo! Placeat alias quasi aspernatur distinctio quos soluta minima
          deserunt maiores, nostrum quam reiciendis labore reprehenderit rerum
          perspiciatis voluptas ipsam fugit odio. Earum rerum officia temporibus
          eius ea sapiente vitae distinctio eveniet eos. Ducimus ab id neque,
          suscipit quas, ut sequi doloremque, exercitationem totam reprehenderit
          natus. Modi eum, eos quas vel quae laborum corrupti numquam excepturi
          aperiam dignissimos eaque! Ipsa animi quam voluptates iste soluta
          perferendis mollitia, quae magnam itaque corrupti eligendi libero,
          inventore at, optio reiciendis cumque voluptatum? Dolores, quasi ut
          corrupti, odio, animi natus maxime nemo et in hic doloremque quod
          repudiandae voluptatem accusamus quibusdam sit tempora facere incidunt
          adipisci obcaecati commodi. Porro minima sint reprehenderit ex labore
          facilis saepe, provident cum aspernatur ipsam nam, fuga quod
          laudantium, unde nihil. Consectetur culpa commodi facilis, vitae
          tempora nisi voluptatibus. Sit reiciendis distinctio ipsa, voluptate
          blanditiis nobis repellendus cumque, consequatur atque tempore sed!
          Esse, quaerat perferendis molestias numquam rerum delectus quibusdam
          ea sint nostrum amet placeat praesentium ad quasi consectetur.
          Voluptate, alias saepe sint fugiat aperiam totam quis blanditiis ipsum
          labore ad incidunt impedit, eveniet tempore illo odio distinctio
          expedita veritatis modi! Consectetur quas, ut consequuntur obcaecati,
          est recusandae illo nisi totam ab optio numquam maiores earum
          cupiditate dolorem eum dignissimos eius vero magni quod fugiat
          accusamus asperiores aut. Minima corrupti alias provident numquam
          natus nam possimus consequuntur dolores officia quaerat et tempora
          maxime, laudantium libero quo facere illo rerum voluptatum quis
          repellendus minus, pariatur fugiat! Neque voluptatum mollitia deleniti
          dolorum est. Ducimus nemo sequi pariatur cupiditate voluptate?
          Perspiciatis ad exercitationem quas eius laboriosam deleniti corporis
          rerum. Dignissimos, repellendus. Quos ipsam enim exercitationem
          quaerat sed et pariatur minus iusto cupiditate velit, fugit ea minima
          fugiat earum repellendus voluptates sit laboriosam eius deleniti
          itaque praesentium dolorum, magnam repellat. Itaque sapiente suscipit
          officia quam exercitationem distinctio libero esse ratione ipsum quae
          nostrum, aliquid sequi odit eius dolor modi praesentium! Deleniti
          alias distinctio ab laborum eum quam asperiores, magni labore eligendi
          ipsa rerum commodi. Asperiores, officiis. Esse nihil, fuga expedita
          voluptas in accusantium qui rerum laborum ea? Inventore enim id
          accusamus, dolorum voluptate laborum quas fuga odio. Labore
          necessitatibus, voluptatem dicta atque praesentium earum aut laborum
          voluptas quasi tenetur saepe natus eveniet officia numquam vitae
          laboriosam omnis aspernatur, cumque aliquid nostrum quo asperiores
          adipisci! Odio magni amet, voluptates tempora numquam aspernatur atque
          ipsum dolorum fuga doloribus quasi nihil corrupti, autem recusandae
          est velit magnam molestias quos dolorem distinctio eveniet dicta
          voluptate. Omnis, assumenda rerum doloremque deserunt laudantium
          consectetur, nam quidem aperiam perspiciatis corporis quo! Provident,
          quos dignissimos tenetur et officiis necessitatibus libero ipsum quo
          vel facere aspernatur eligendi impedit, porro quam, vitae perspiciatis
          id nam similique omnis eaque.
        </p>
      </Container>
    </>
  );
};

export default App;
